import React, { ReactElement, Fragment } from 'react'
import {Entry} from "../../interface";
import EntryModal from '../EntryModal/EntryModal';

interface Props {
    entry: Entry;
}

function EntryItem({entry}: Props): ReactElement {
    return (
        <Fragment>
            <div className="box__outer_area_entry">
                <div className="box__inner_area_entry">
                    <h5 className="title">{entry?.title}</h5>
                    <span className="entry__content">{entry?.content}</span>
                    <EntryModal btnTitle={'Edit Entry'} id={entry?.id} mode={'edit'} diary_id={entry?.diaryId} editInfo={{title:entry?.title, content:entry?.content}}/>
                </div>
            </div>
        </Fragment>
    )
}

export default EntryItem
