import React from 'react'
import { useEffect, useState } from 'react';

const SearchForm = props => {
    const [keyword, setKeyword] = useState('');
    const [showRemoveBtn, setShowRemoveBtn] = useState(false);

    useEffect(() => {
        setKeyword(props.query);
        setShowRemoveBtn(props.query.length > 0)
    }, [props.query]);

    const handleChange = e => {
        setKeyword(e.target.value);
        setShowRemoveBtn(e.target.value.length > 0);
        if (e.target.value.length === 0) handleReset();
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.onSubmit(keyword);
    }

    const handleReset = e => {
        if (e) e.preventDefault();
        setKeyword('');
        setShowRemoveBtn(false);
        props.onReset();
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <input type="text" placeholder="검색어를 입력하세요" value={keyword} onChange={handleChange} autoFocus />
            {showRemoveBtn && <button type="reset" className="btn-reset"></button>}
        </form>
    )
}

export default SearchForm