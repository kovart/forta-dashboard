import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import pluralize from 'pluralize';

import styles from './Address.module.scss';

import Button from '@components/shared/Button/Button';
import Icon, { IconSymbols } from '@components/shared/Icon/Icon';
import Spinner from '@components/shared/Spinner/Spinner';
import Fade from '@components/shared/Transitions/Fade/Fade';
import Menu from '@components/shared/Menu/Menu';
import Tooltip from '@components/shared/Tooltip/Tooltip';
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
  clickable = !!onCheckedChange,
  checked = false,
  onCheckedChange,
  className
}) {
  const { getAddressMeta } = useContext(AppContext);
  const [meta, setMeta] = useState(null);
  const { isContract, transactionCount } = meta || {};
  const Element = clickable ? 'button' : 'div';
  const props = clickable ? { onClick: () => onCheckedChange(!checked) } : {};

  useEffect(() => {
    (async () => {
      setMeta(await getAddressMeta(address, chainId));
    })();
  }, []);

  return (
    <div
      className={cn(styles.root, className, {
        [styles.checked]: checked
      })}
    >
      <Element
        className={cn(styles.body, {
          [styles.clickable]: clickable
        })}
        {...props}
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
              <Tooltip title="Smart contract">
                <div className={styles.contract}>
                  <Icon symbol={IconSymbols.Code} size={15} />
                </div>
              </Tooltip>
            ) : (
              <Tooltip title={pluralize('transaction', transactionCount, true)}>
                <span
                  className={styles.transactionCount}
                  style={{ background: getIndicatorColor(transactionCount) }}
                >
                  {transactionCount > 99 ? '99+' : transactionCount}
                </span>
              </Tooltip>
            )}
          </Fade>
        </span>
      </Element>
      <div className={styles.actions}>
        <Menu
          preferredWidth={180}
          placement={POPOVER_PLACEMENT.bottomEnd}
          renderElement={({ ref, toggle }) => (
            <Tooltip title="View options">
              <Button
                ref={ref}
                type="button"
                variant="icon-md"
                icon={{ symbol: IconSymbols.MoreVertical, size: 18 }}
                className={styles.moreButton}
                onClick={toggle}
              />
            </Tooltip>
          )}
        >
          <Menu.Item
            startIcon={IconSymbols.ExternalLink}
            href={routes.external.explorer[chainId].address(address)}
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
    </div>
  );
}

Address.propTypes = {
  address: PropTypes.string.isRequired,
  chainId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  checked: PropTypes.bool,
  clickable: PropTypes.bool,
  className: PropTypes.string,
  onCheckedChange: PropTypes.func
};

export default Address;
