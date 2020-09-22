import React, { ReactElement, Fragment, useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import "./Entries.css";
import { RootState } from '../../store/rootReducer';
import EntryModal from '../EntryModal/EntryModal';
import {Diary} from "../../interface"
import { getEntries } from '../../features/entry/entrySlice';

interface Props {
    
}

function Entries({}: Props): ReactElement {

    const {diaries} = useSelector((state: RootState) => state.diary);
    const {entries} = useSelector((state: RootState) => state.entry);
    const [diary, setDiary] = useState<Diary | null>();
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        const filterDiary = diaries.filter(diary => diary.id === id);
        filterDiary && setDiary(filterDiary[0]);
        filterDiary && dispatch(getEntries(filterDiary[0]?.id));
    }, [diary])

    if(!diary)
        return <div>Not Found</div>;

    return (
        <Fragment>
            <section className="body__area">
                <div className="button_area">
                <h3>{diary?.title}</h3>
                {diary && <EntryModal btnTitle={'Add Entry'} mode={'add'} diary_id={diary.id}/>}
                </div>
                <div className="diary_area">
                    {
                        entries.length > 0 &&
                        entries.map(entry => (
                            <div className="box__outer_area_entry">
                                <div className="box__inner_area_entry">
                                    <h5 className="title">{entry?.title}</h5>
                                    <span className="entry__content">{entry?.content}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Fragment>
    )
}

export default Entries
