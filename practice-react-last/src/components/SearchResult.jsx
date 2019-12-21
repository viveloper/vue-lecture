import React from 'react'

const SearchResult = props => {
    if (props.loading) {
        return (
            <div>loading...</div>
        )
    }
    else if (props.result.length > 0) {
        return (
            <div>
                <ul className="list">
                    {props.result.map(item =>
                        <li key={item.id}>
                            <img src={item.image} alt={item.image} />
                            <p>{item.name}</p>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
    else {
        return (
            <div>검색 결과가 없습니다</div>
        )
    }

}

export default SearchResult