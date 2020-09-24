import React, { ReactElement, Fragment, useEffect } from 'react'
import "./home.css";
import Diary from '../Diary/Diary';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { getDiaries } from '../../features/diary/diarySlice';
import DiaryModal from '../DiaryModal/DiaryModal';


interface Props {
    
}

function Home({}: Props): ReactElement {

    const {diaries} = useSelector((state: RootState) => state.diary);
    const {user} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        user && user?.id && dispatch(getDiaries(user?.id));
    }, [dispatch])

    return (
        <Fragment>
            <section className="body__area">
                <div className="button_area">
                    <h3>Diaries</h3>
                    <DiaryModal btnTitle={'Create New'} title={'Create Diary'} id={""} mode={'add'} editInfo={{title:"", type:"private"}} />
                </div>
                <div className="diary_area">
                    {
                        diaries.length > 0 &&
                        diaries.map(diary => (
                            <Diary title={diary?.title} id={diary?.id} key={diary?.id} type={diary?.type} />
                        ))
                    }
                </div>
            </section>
        </Fragment>
    )
}

export default Home
