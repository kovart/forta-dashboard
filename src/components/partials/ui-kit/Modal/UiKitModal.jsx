import React, { useState } from 'react';

import UiKitSection from '@components/partials/ui-kit/Section/UiKitSection';
import Button from '@components/shared/Button/Button';
import Modal from '@components/shared/Modal/Modal';

function UiKitModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <UiKitSection title="Modal">
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Show modal
      </Button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header
          title="Filter by address"
          onClose={() => setIsModalOpen(false)}
        />
        <Modal.Body>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad
          aspernatur consequuntur dolor eum facilis molestiae nobis quos, sequi
          velit voluptatem! Distinctio perferendis, sint! A delectus dicta hic
          laborum tempore totam ut, voluptate. Blanditiis hic quis unde vel? A
          accusantium aliquam ducimus ea error exercitationem in necessitatibus
          nisi obcaecati, qui quo totam veritatis? Delectus dolores explicabo
          quos reiciendis veniam. Earum non quisquam vitae. Accusantium alias
          dignissimos ex illum sint! Aliquid architecto at blanditiis
          consequuntur est nobis quia recusandae reprehenderit sequi ullam.
          Animi consequatur dolorum expedita laboriosam, nostrum perferendis
          quidem repellat repellendus saepe? Alias, aliquam aut necessitatibus
          nemo, neque nihil optio quidem repellendus sit vel, vero voluptatem.
          Accusamus animi architecto culpa, itaque magnam minima pariatur
          tempore velit voluptate voluptatum! Aliquam architecto beatae dolores
          eius eveniet ipsam iure libero maxime, non obcaecati officia
          repellendus, sit temporibus vel, voluptate? Blanditiis dolores, iusto?
          Aspernatur beatae ea iure molestias vel! Aspernatur at cum eos et
          incidunt ipsam neque nobis non odio ratione recusandae reiciendis
          saepe suscipit totam, vero! Architecto atque, dolorem eaque eligendi
          expedita fuga harum id illo iusto, necessitatibus nostrum odit quidem
          quos sint temporibus. Aperiam consequuntur corporis culpa deleniti
          dolor ducimus earum eligendi est expedita hic ipsam laboriosam magnam
          magni minima nam neque pariatur porro praesentium quam quisquam
          recusandae reprehenderit similique, sit ullam vero. Aperiam at
          blanditiis consectetur, consequuntur cupiditate deleniti eius eum
          eveniet facere, harum necessitatibus quidem ratione reprehenderit sint
          sunt vel voluptatem! Corporis doloremque ducimus, hic maiores soluta
          voluptate! Ab deserunt dolorem dolores earum excepturi explicabo
          impedit pariatur voluptatem. Adipisci at delectus deserunt dolores
          eaque eos eveniet expedita, explicabo fugit harum illo impedit ipsa
          laborum molestias, nobis nulla odio officia pariatur placeat provident
          quia quisquam rerum saepe ullam velit. Fuga impedit incidunt iure
          maiores quasi quidem repellat reprehenderit velit? Accusamus
          accusantium ad alias aperiam asperiores autem beatae deserunt dolor
          dolores et eveniet illo illum laboriosam laborum molestiae
          necessitatibus obcaecati quam quia, quibusdam sunt tempore vel vitae.
          Ad adipisci at atque aut commodi consectetur consequuntur cum dicta
          dolore dolorum, earum error et eveniet explicabo facilis hic incidunt
          ipsa iste laboriosam laborum laudantium maiores mollitia nam nostrum
          officia officiis perferendis provident, quas qui reiciendis tempore
          ullam unde, voluptates. Aperiam deserunt excepturi incidunt iste iusto
          odio, officia rerum tempore voluptatibus! Ducimus in maiores modi
          omnis perspiciatis suscipit totam. Accusantium amet delectus dolore
          eos iure obcaecati reiciendis tempora velit voluptates! A consequatur
          cupiditate facere fugit mollitia nostrum possimus reiciendis sunt
          veritatis vitae. Ab facere libero sequi?
        </Modal.Body>
        <Modal.Controls
          actions={[
            { label: 'Cancel', onClick: () => setIsModalOpen(false) },
            {
              label: 'Apply',
              primary: true,
              onClick: () => {
                alert('Applied');
                setIsModalOpen(false);
              }
            }
          ]}
        />
      </Modal>
    </UiKitSection>
  );
}

export default UiKitModal;
