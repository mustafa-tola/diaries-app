import React, { ReactElement, Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { addEntry, updateEntry } from '../../features/entry/entrySlice';
import { showAlert } from '../../utils/utils';

const useStyles = makeStyles(theme => ({
    paperAnchorRight: {
        top: '60px',
        width: '320px',
        right: 0,
        bottom: 0,
        boxShadow: '0 0 2em rgba(0,0,0,.15)',
        position: 'fixed',
        height: 'auto'
    },
    icon_back: {
        display: 'block',
        cursor: 'pointer'
    }
  }));

interface Props {
    btnTitle: string;
    mode: string;
    diary_id: string;
}

function EntryModal({btnTitle, mode, diary_id}: Props): ReactElement {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [entryData, setEntryData] = useState({
        title: "",
        content: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLElement>) => {
        setEntryData({
            ...entryData,
            [event.target.name] : event.target.value
        });
    };
    

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
    };

    const handleSubmit = (e : React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        mode === "add" ? 
        dispatch(addEntry({...entryData, dairyId: diary_id}))
        :
        dispatch(updateEntry({...entryData, id: diary_id}));

        setOpen(false);
        showAlert('Saved!', 'success');
    }

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
                            <form onSubmit={handleSubmit}>
                                <input className="title_input" name="title" onChange={handleChange} value={entryData.title}/>
                                <textarea name="content" row="10" className="content_field" onChange={handleChange} value={entryData.content}>{entryData.content}</textarea>
                                <button className="button_add" type="submit">Save</button>
                            </form>
                        </div>
                </div>
            </SwipeableDrawer>
        </Fragment>
    )
}

export default EntryModal
