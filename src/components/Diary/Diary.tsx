import React, { ReactElement, useState, useEffect } from 'react'
import DiaryModal from '../DiaryModal/DiaryModal';
import {useSelector} from 'react-redux';
import { RootState } from '../../store/rootReducer';
import {Link} from 'react-router-dom';
import http from "../../services/api";
import {Entry} from "../../interface";

interface Props {
    title: string;
    type: 'private' | 'public';
    id?: string;
}

type dataEdit = {
    title: string;
    type: 'private' | 'public';
}

const Diary = ({title, type, id}: Props): ReactElement => {

    const {diaries} = useSelector((state: RootState) => state.diary);

    const [onEdit, setEdit] = useState<dataEdit>({title:"", type:"public"});
    const [count, setCount] = useState(0);

    useEffect(() => {
        const filterDiary = diaries.filter(diary => diary.id === id);
        filterDiary && setEdit({title: filterDiary[0].title, type: filterDiary[0].type})
        http.get<null, { entries: Entry[] }>('/api/entries/'+id)
        .then(({ entries }) => {
                setCount(entries.length);
        })
    }, [diaries])

    return (
        <div className="box__outer_area">
            <div className="box__inner_area">
                <div>
                    <h5>{title}</h5>
                    <span className="type__text">{type}</span>
                    <span className="entry__count">{count} Entries</span>
                </div>
                <div>
                    <DiaryModal btnTitle={'Edit'} title={'Edit Diary'} mode={'edit'} id={id} editInfo={onEdit} />
                    <Link to={`/${id}/entries`}>
                        <button className="button_white">Entries</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Diary
