import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './Address.module.scss';

import Button from '@components/shared/Button/Button';
import Icon, { IconSymbols } from '@components/shared/Icon/Icon';
import Spinner from '@components/shared/Spinner/Spinner';
import Fade from '@components/shared/Transitions/Fade/Fade';
import Menu from '@components/shared/Menu/Menu';
import { AppContext } from '@components/providers/AppContext/AppContext';
import { POPOVER_PLACEMENT } from '@components/shared/Popover/Popover.utils';
import { copyToClipboard } from '@utils/helpers';
import routes from '@constants/routes';

const getIndicatorColor = (transactionCount) => {
  if (transactionCount > 50) {
    return '#63b715';
  } else if (transactionCount > 15) {
    return '#F6C547';
  } else {
    return '#8c8c8c';
  }
};

function Address({
  address,
  chainId,
  checked = false,
  disabled = false,
  onCheckedChange = () => {},
  className
}) {
  const { getAddressMeta } = useContext(AppContext);
  const [meta, setMeta] = useState(null);

  const { isContract, transactionCount } = meta || {};

  useEffect(() => {
    (async () => {
      setMeta(await getAddressMeta(address, chainId));
    })();
  }, []);

  return (
    <div className={cn(styles.root, className)}>
      <div
        tabIndex={!disabled ? 0 : undefined}
        role={!disabled ? 'button' : undefined}
        onClick={() => onCheckedChange(!checked)}
        className={cn(styles.body, {
          [styles.checked]: checked,
          [styles.disabled]: disabled
        })}
      >
        <Icon
          size={null}
          symbol={IconSymbols.CreditCard}
          className={styles.icon}
        />
        <span className={styles.address}>{address}</span>
        <span className={styles.indicator}>
          {!meta && <Spinner size="xs" />}
          <Fade visible={!!meta}>
            {isContract ? (
              <div className={styles.contract} title="Smart contract">
                <Icon symbol={IconSymbols.Code} size={15} />
              </div>
            ) : (
              <span
                className={styles.transactionCount}
                style={{ background: getIndicatorColor(transactionCount) }}
                title={transactionCount}
              >
                {transactionCount > 99 ? '99+' : transactionCount}
              </span>
            )}
          </Fade>
        </span>
      </div>
      <Menu
        placement={POPOVER_PLACEMENT.bottomEnd}
        preferredWidth={180}
        renderElement={({ ref, toggle }) => (
          <Button
            ref={ref}
            type="button"
            variant="icon-md"
            icon={{ symbol: IconSymbols.MoreVertical, size: 18 }}
            className={styles.moreButton}
            onClick={toggle}
          />
        )}
      >
        <Menu.Item
          startIcon={IconSymbols.ExternalLink}
          href={routes.external.explorer[chainId](address)}
        >
          Explorer
        </Menu.Item>
        <Menu.Item
          startIcon={IconSymbols.AlertCircle}
          href={routes.external.chainabuse(address)}
        >
          Chainabuse
        </Menu.Item>
        <Menu.Item
          startIcon={IconSymbols.Twitter}
          href={routes.external.twitter(address)}
        >
          Twitter
        </Menu.Item>
        <Menu.Separator />
        <Menu.Item
          startIcon={IconSymbols.Clipboard}
          onClick={() => copyToClipboard(address)}
        >
          Copy address
        </Menu.Item>
      </Menu>
    </div>
  );
}

Address.propTypes = {
  address: PropTypes.string.isRequired,
  chainId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onCheckedChange: PropTypes.func
};

export default Address;
