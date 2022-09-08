import React, { useLayoutEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ethers } from 'ethers';

import styles from './AddressFilterModal.module.scss';

import Modal from '@components/shared/Modal/Modal';
import Input from '@components/shared/Form/Input/Input';
import Button from '@components/shared/Button/Button';
import { IconSymbols } from '@components/shared/Icon/Icon';

function AddressFilterModal({
  open = false,
  addresses = [],
  className,
  onClose,
  onAddressesChange
}) {
  const [localAddresses, setLocalAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState('');

  useLayoutEffect(() => {
    setLocalAddresses(addresses);
  }, [open]);

  const isNewAddressValid = useMemo(
    () => !newAddress || ethers.utils.isAddress(newAddress),
    [newAddress]
  );

  function handleAddNewAddress() {
    setLocalAddresses((v) => [...new Set([newAddress, ...v])]);
    setNewAddress('');
  }

  function handleApply(e) {
    e.preventDefault();

    onAddressesChange(localAddresses);
    onClose();
  }

  return (
    <Modal
      closable
      open={open}
      size="md"
      onClose={onClose}
      className={cn(styles.root, className)}
    >
      <Modal.Header title="Filter by address" onClose={onClose} />
      <Modal.Body className={styles.body}>
        <form onSubmit={handleApply}>
          <Input
            autoFocus
            type="text"
            components={{
              right: [
                {
                  width: 80,
                  render: () => (
                    <Button
                      variant="primary"
                      endIcon={IconSymbols.Plus}
                      className={styles.addButton}
                      disabled={!newAddress || !isNewAddressValid}
                      onClick={handleAddNewAddress}
                    >
                      Add
                    </Button>
                  )
                }
              ]
            }}
            name="address"
            variant="dark"
            invalid={!isNewAddressValid}
            placeholder="0x..."
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
        </form>
        {localAddresses.length > 0 && (
          <ul className={styles.list}>
            {localAddresses.map((address) => (
              <li className={styles.item} key={address}>
                <div className={styles.address}>{address}</div>
                <Button
                  type="button"
                  variant="icon-md"
                  icon={IconSymbols.Cross}
                  className={styles.removeButton}
                  onClick={() =>
                    setLocalAddresses(
                      localAddresses.filter(
                        (localAddress) => localAddress !== address
                      )
                    )
                  }
                />
              </li>
            ))}
          </ul>
        )}
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

AddressFilterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  addresses: PropTypes.arrayOf(PropTypes.string),
  className: PropTypes.string,
  onClose: PropTypes.func,
  onAddressesChange: PropTypes.func
};

export default AddressFilterModal;
