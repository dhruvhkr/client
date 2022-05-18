import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";

function InfoModal({ open, setOpen }) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => {
        setOpen(false);
        navigate(`/policy/${id}`);
      }}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content>
        <Modal.Description>
          Policy has been updated Successfully
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            setOpen(false);
            navigate(`/policy/${id}`);
          }}
        >
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default InfoModal;
