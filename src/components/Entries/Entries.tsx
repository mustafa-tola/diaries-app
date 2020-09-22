import React, { ReactElement, Fragment, useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import {useSelector} from 'react-redux';
import "./Entries.css";
import { RootState } from '../../store/rootReducer';
import EntryModal from '../EntryModal/EntryModal';

interface Props {
    
}

function Entries({}: Props): ReactElement {

    const {diaries} = useSelector((state: RootState) => state.diary);
    const [title, setTitle] = useState("");

    const { id } = useParams();

    useEffect(() => {
        const filterDiary = diaries.filter(diary => diary.id === id);
        filterDiary && setTitle(filterDiary[0].title)
    }, [title])

    if(!title)
        return <div>Not Found</div>;

    return (
        <Fragment>
            <section className="body__area">
                <div className="button_area">
                <h3>{title}</h3>
                <EntryModal btnTitle={'Add Entry'}/>
                </div>
                <div className="diary_area">
                    <div className="box__outer_area_entry">
                    <div className="box__inner_area_entry">
                        <h5 className="title">New Era</h5>
                        <span className="entry__content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint saepe animi iste a, iusto in dolor earum facere quibusdam aliquid expedita exercitationem quos eaque repudiandae quod esse consectetur vero fugit!</span>
                    </div>
                    </div>
                </div>
            </section>
        </Fragment>
    )
}

export default Entries
