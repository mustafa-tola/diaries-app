import React, { ReactElement, Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { addEntry, updateEntry } from '../../features/entry/entrySlice';
import { showAlert } from '../../utils/utils';
import "./entrymodal.css";

const useStyles = makeStyles(theme => ({
    paperAnchorRight: {
        top: '60px',
        width: '70%',
        right: 0,
        bottom: 0,
        boxShadow: '0 0 2em rgba(0,0,0,.15)',
        position: 'fixed',
        height: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '100%',
        },
    },
    icon_back: {
        display: 'block',
        cursor: 'pointer'
    }
  }));

interface Props {
    btnTitle: string;
    mode: string;
    diary_id?: string;
    id?:string;
    editInfo : {
        title: string;
        content: string;
    },
}

function EntryModal({btnTitle, mode, diary_id, id, editInfo}: Props): ReactElement {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [entryData, setEntryData] = useState({
        title: "",
        content: ""
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEntryData({
            ...entryData,
            title : event.target.value
        });
    };

    const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEntryData({
            ...entryData,
            content : event.target.value
        });
    };
    

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
    };

    const handleSubmit = (e : React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        mode === "add" ? 
        dispatch(addEntry({...entryData, diaryId: diary_id}))
        :
        dispatch(updateEntry({...entryData, id: id}));

        setOpen(false);
        showAlert('Saved!', 'success');
    }

    useEffect(() => {
        setEntryData(editInfo)
    }, [editInfo])

    return (
        <Fragment>
            <button className="button_add" onClick={() => toggleDrawer(true)}>{btnTitle}</button>
                <SwipeableDrawer
                anchor={'right'}
                open={open}
                onClose={() => toggleDrawer(false)}
                onOpen={() => toggleDrawer(true)}
                classes={{ paperAnchorRight: classes.paperAnchorRight}}
            >
                <div className="sidebar__full">
                    <header className="sidebar__header">
                            <ArrowBackIosIcon className={classes.icon_back} onClick={() => toggleDrawer(false)}/>
                            <span>Create Entry</span>
                        </header>
                        <div className="body_form_area">
                            <form onSubmit={handleSubmit} style={{textAlign: 'center'}}>
                                <input className="title_input" name="title" onChange={handleInputChange} value={entryData.title}/>
                                <textarea name="content" className="content_field" onChange={handleTextAreaChange} value={entryData.content}>{entryData.content}</textarea>
                                <button className="button_add" type="submit">Save</button>
                            </form>
                        </div>
                </div>
            </SwipeableDrawer>
        </Fragment>
    )
}

export default EntryModal
