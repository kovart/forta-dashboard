import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './BotItem.module.scss';

import Checkable from '@components/shared/Form/Checkable/Checkable';
import { simplifyAddress } from '@utils/helpers';
import { CHAIN_IMAGE, CHAIN_NAMES } from '@constants/common';

function BotItem({ bot, checked, onCheckedChange, className }) {
  return (
    <Checkable
      name={bot.id}
      value={bot.id}
      checked={checked}
      onChange={onCheckedChange}
      className={cn(styles.root, className)}
    >
      <div className={styles.id}>{simplifyAddress(bot.id)}</div>
      <div className={styles.name}>{bot.name}</div>
      {bot.description && (
        <div className={styles.description}>{bot.description}</div>
      )}
      <div className={styles.chains}>
        {bot.chainIds.map((id) => {
          if (!CHAIN_IMAGE[id]) return null;

          return (
            <img
              key={id}
              src={CHAIN_IMAGE[id]}
              alt={CHAIN_NAMES[id]}
              className={styles.chain}
            />
          );
        })}
      </div>
    </Checkable>
  );
}

BotItem.propTypes = {
  bot: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    chainIds: PropTypes.arrayOf(PropTypes.string)
  }),
  checked: PropTypes.bool,
  className: PropTypes.string,
  onCheckedChange: PropTypes.func
};

export default BotItem;
