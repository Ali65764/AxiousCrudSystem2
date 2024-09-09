import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useGlobalContext } from '../stores/GlobalContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeleteSingleUser } from '../api/Request';
import {QUERIES} from "../constant/Queries"
import { toast } from 'react-toastify';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function Delete() {
    const {
        show,
        deletedUser,
        closeDeleteModal
    }=useGlobalContext();

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: DeleteSingleUser,
        onSuccess:()=>{
            queryClient.invalidateQueries(QUERIES.SingleUser);
            closeDeleteModal();
            toast.success("User deleted successfully!",{
                autoClose:1500
            })
        },
        onError:()=>{
            closeDeleteModal();
        }
    });

    const handleDelete = ()=>{
        if(deletedUser){
            mutation.mutate(deletedUser.id)
        }
    }
  return (
    <div>
      <Modal
        open={show}
        onClose={closeDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete 
          <span className="text-red-600 fs-4 mx-1">
          {deletedUser && deletedUser.fullName}
        </span>
        ?
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2,color:"red" }}>
          This action cannot be undone!!!
        </Typography>
        <div className='mt-4'>
        <Button onClick={handleDelete} color="error" variant="contained" size='small'>
          Delete
        </Button>
        <Button onClick={closeDeleteModal} variant="outlined" size='small' sx={{marginLeft:'10px'}}>
          Cancel
        </Button>
        </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Delete