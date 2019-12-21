import React from 'react'

const KeywordList = props => {

    const handleClickList = keyword => {
        props.onClickList(keyword);
    }

    const handleClickRemove = (e, keyword) => {
        e.stopPropagation();
        props.onClickRemove(keyword);
    }
    if (props.list.length > 0) {
        return (
            <ul className="list">
                {props.list.map((item, index) =>
                    <li key={item.keyword} onClick={() => handleClickList(item.keyword)}>
                        {props.type === 'recommend' && <span className="number">{index + 1}</span>}
                        {item.keyword}
                        {props.type === 'history' && <span className="date">{item.date}</span>}
                        {props.type === 'history' && <button className="btn-remove" onClick={(e) => handleClickRemove(e, item.keyword)}></button>}
                    </li>
                )}
            </ul>
        )
    }
    else {
        return (
            <>
                {props.type === 'recommend' && <div>추천 검색어가 없습니다</div>}
                {props.type === 'history' && <div>최근 검색어가 없습니다</div>}
            </>
        )
    }

}

export default KeywordList