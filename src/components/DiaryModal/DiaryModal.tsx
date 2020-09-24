import React, { ReactElement, useEffect, useState, Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { addDiary, updateDiary } from '../../features/diary/diarySlice';
import { showAlert } from '../../utils/utils';
import Loading from '../Loading/Loading.component';

type dataEdit = {
    title: string;
    type: 'private' | 'public';
}

interface Props {
    btnTitle:string;
    title: string;
    id?: string;
    editInfo: dataEdit,
    mode: string
}

function DiaryModal({btnTitle, title, id, editInfo, mode}: Props): ReactElement {

    const {user} = useSelector((state: RootState) => state.auth);
    const {loading} = useSelector((state: RootState) => state.diary);
    const dispatch = useDispatch();

    const [data, setData] = useState<{title: string; type: 'private' | 'public';}>({
        title: "",
        type: "public"
    });
    const [open, setOpen] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };

    const submit = () => {
        mode === "add" ? 
        user && user?.id && dispatch(addDiary({...data, userId: user?.id}))
        :
        dispatch(updateDiary({...data, id: id}));

        setOpen(false);
        showAlert('Saved!', 'success');
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setData(editInfo)
    }, [editInfo])

    return (
        <Fragment>
            <button className="button_add" onClick={handleClickOpen}>{btnTitle}</button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" fullWidth={true}>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        name="title"
                        margin="dense"
                        id="name"
                        label="Title"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        value={data.title}
                    />
                    <Radio
                        checked={data.type === 'public'}
                        onChange={handleChange}
                        value="public"
                        name="type"
                        inputProps={{ 'aria-label': 'Public' }}
                    /> Public
                    <Radio
                        checked={data.type === 'private'}
                        onChange={handleChange}
                        value="private"
                        name="type"
                        inputProps={{ 'aria-label': 'Private' }}
                    /> Private
                </DialogContent>
                <DialogActions>
                    <button className="button_white" onClick={handleClose}>Close</button>
                    {
                        loading
                        ?
                        <button className="button_add">
                            <Loading type="spinner-border text-light"/>
                        </button>
                        :
                        <button className="button_add" onClick={submit}>Save</button>
                    }
                </DialogActions>
            </Dialog>
        </Fragment>
    )
}

export default DiaryModal
