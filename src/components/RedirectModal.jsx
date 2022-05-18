import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Modal } from "semantic-ui-react";

function RedirectModal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  return (
    <Modal
      centered={false}
      open={open}
      onClose={() => {
        // setOpen(false);
        navigate(`/`);
      }}
      onOpen={() => setOpen(true)}
    >
      <Modal.Header>No Result Found</Modal.Header>
      <Modal.Content>
        <Modal.Description>Click OK to redirect to homepage</Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="green"
          onClick={() => {
            navigate(`/`);
          }}
        >
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default RedirectModal;
