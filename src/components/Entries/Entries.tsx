import React, { ReactElement, Fragment, useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import "./Entries.css";
import { RootState } from '../../store/rootReducer';
import EntryModal from '../EntryModal/EntryModal';
import {Diary} from "../../interface"
import { getEntries } from '../../features/entry/entrySlice';
import EntryItem from '../Entry/Entry';

interface Props {
    
}

function Entries({}: Props): ReactElement {

    const {diaries} = useSelector((state: RootState) => state.diary);
    const {entries} = useSelector((state: RootState) => state.entry);
    const [diary, setDiary] = useState<Diary | null>();
    const [notfoundStatus, setStatus] = useState(false);
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        const filterDiary = diaries.filter(diary => diary.id === id);
        filterDiary ? setDiary(filterDiary[0]) : setStatus(true);
        filterDiary && filterDiary[0]?.id && dispatch(getEntries(filterDiary[0]?.id));
    }, [diary])

    if(!diary && notfoundStatus)
        return <div>Not Found</div>;

    if(!diary)
        return <div>Loading ...</div>

    return (
        <Fragment>
            <section className="body__area">
                <div className="button_area">
                <h3>{diary?.title}</h3>
                {diary && <EntryModal btnTitle={'Add Entry'} mode={'add'} diary_id={diary.id} id={""} editInfo={{title:"", content:""}}/>}
                </div>
                <div className="entry_area">
                    {
                        entries.length > 0 &&
                        entries.map(entry => (
                            <EntryItem entry={entry} key={entry?.id}/>
                        ))
                    }
                </div>
            </section>
        </Fragment>
    )
}

export default Entries
