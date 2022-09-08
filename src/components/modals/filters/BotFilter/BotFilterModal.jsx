import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { uniqBy } from 'lodash';
import { useQuery } from 'react-query';

import styles from './BotFilterModal.module.scss';

import Modal from '@components/shared/Modal/Modal';
import Input from '@components/shared/Form/Input/Input';
import BotItem from '@components/modals/filters/BotFilter/BotItem/BotItem';
import Loader from '@components/shared/Loader/Loader';
import useStateDebounce from '@hooks/useStateDebounce';
import forta from '@utils/forta';
import { IconSymbols } from '@components/shared/Icon/Icon.utils';

const fetchBots = async ({ queryKey }) => {
  const [search] = queryKey;
  const isAddress = search.indexOf('0x') === 0;
  const { bots } = await forta.getBots({
    ids: isAddress ? [search] : [],
    name: isAddress ? null : search,
    first: 20
  });
  return bots;
};

function BotFilterModal({
  open,
  botIds = [],
  className,
  onBotIdsChange,
  onClose
}) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [search, searchQuery, setSearch] = useStateDebounce('');
  const [localBotIds, setLocalBotIds] = useState([]);
  const [selectedBots, setSelectedBots] = useState([]);
  const { data: searchedBots = [], isFetching } = useQuery(
    [searchQuery],
    fetchBots,
    { keepPreviousData: true }
  );

  const bots = useMemo(() => {
    const filter = search ? (b) => b.name.indexOf(search) > 0 : () => true;
    return uniqBy(
      [...selectedBots.filter(filter), ...searchedBots],
      (v) => v.id
    );
  }, [search, searchedBots]);

  useLayoutEffect(() => {
    setLocalBotIds(open ? botIds : []);
  }, [open]);

  useEffect(() => {
    if (open && botIds.length > 0) {
      (async () => {
        setIsInitialized(false);
        const { bots } = await forta.getBots({
          ids: botIds,
          first: botIds.length
        });
        setSelectedBots(bots);
        setIsInitialized(true);
      })();
    } else {
      setIsInitialized(true);
    }
  }, [open]);

  function handleBotCheckedChange(bot, isChecked) {
    setSelectedBots((v) =>
      isChecked ? v.filter((b) => b.id !== bot.id) : [bot, ...v]
    );
    setLocalBotIds((v) =>
      isChecked ? v.filter((id) => id !== bot.id) : [bot.id, ...v]
    );
  }

  function handleApply() {
    onBotIdsChange(localBotIds);
    onClose();
  }

  return (
    <Modal
      size="md"
      open={open}
      className={cn(styles.root, className)}
      onClose={onclose}
    >
      <Modal.Header title="Filter by bot" onClose={onClose} />
      <Modal.Body>
        <Input
          autoFocus
          resettable
          type="text"
          name="search"
          variant="dark"
          icon={{ left: IconSymbols.Search }}
          placeholder="Search by Name or Bot ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.search}
        />
        <div className={styles.content}>
          <ul className={styles.list}>
            {bots.map((bot) => {
              const isChecked = localBotIds.includes(bot.id);
              return (
                <li key={bot.id} className={styles.item}>
                  <BotItem
                    bot={bot}
                    checked={isChecked}
                    onCheckedChange={() =>
                      handleBotCheckedChange(bot, isChecked)
                    }
                    className={styles.bot}
                  />
                </li>
              );
            })}
          </ul>
          {(!isInitialized || isFetching) && (
            <Loader bg="translucent" position="absolute" spinner="asterisk" />
          )}
        </div>
      </Modal.Body>
      <Modal.Controls
        actions={[
          {
            label: 'Apply',
            primary: true,
            onClick: handleApply
          },
          {
            label: 'Cancel',
            onClick: onClose
          }
        ]}
      />
    </Modal>
  );
}

BotFilterModal.propTypes = {
  open: PropTypes.bool,
  botIds: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  onBotIdsChange: PropTypes.func,
  onClose: PropTypes.func
};

export default BotFilterModal;
