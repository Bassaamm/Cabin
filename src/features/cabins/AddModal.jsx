import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";

export default function AddModal() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button size="small">Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateCabinForm closeModal />
      </Modal.Window>
    </Modal>
  );
}
