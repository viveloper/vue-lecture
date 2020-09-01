const tabs = {
  recommend: 'recommend',
  recent: 'recent'
};

const App = () => {
  const { searchValue, handleFormChange } = useSearchFormChange('');
  const { searchResult, handleSearchResult } = useSearchResult([]);
  const handleFormSubmit = useSearchFormSubmit(searchValue, handleSearchResult);
  const handleFormClear = useSearchFormClear(
    handleFormChange,
    handleSearchResult
  );
  useClearEffect(searchValue, handleSearchResult);

  const [activeTab, setActiveTab] = React.useState(tabs.recommend);
  const [terms, setTerms] = React.useState([]);
  const handleTabChange = tab => {
    if (tab === tabs.recommend) {
      setActiveTab(tabs.recommend);
    } else {
      setActiveTab(tabs.recent);
    }
  };
  React.useEffect(() => {
    if (activeTab === tabs.recommend) {
      recommendTerms.getRecommendTerms().then(terms => setTerms([...terms]));
    } else {
      recentTerms.getRecentTerms().then(terms => setTerms([...terms]));
    }
  }, [activeTab]);
  const handleTermClick = term => {
    console.log(term);
  };

  return (
    <React.Fragment>
      <Header />
      <SearchForm
        value={searchValue}
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
        onClear={handleFormClear}
      />
      <SearchTerms>
        <Tabs activeTab={activeTab} onChange={handleTabChange} />
        <Terms activeTab={activeTab} terms={terms} onClick={handleTermClick} />
      </SearchTerms>
      <SearchResult result={searchResult} />
    </React.Fragment>
  );
};

const useSearchFormChange = initValue => {
  const [searchValue, setSearchValue] = React.useState(initValue);
  const handleFormChange = value => {
    setSearchValue(value);
  };
  return {
    searchValue,
    handleFormChange
  };
};

const useSearchResult = initValue => {
  const [searchResult, setSearchResult] = React.useState(initValue);
  const handleSearchResult = result => {
    setSearchResult(result);
  };
  return {
    searchResult,
    handleSearchResult
  };
};

const useSearchFormSubmit = (searchValue, handleSearchResult) => {
  const handleFormSubmit = e => {
    e.preventDefault();
    if (searchValue.length > 0) {
      products.getProducts(searchValue).then(products => {
        handleSearchResult([...products]);
      });
    }
  };
  return handleFormSubmit;
};

const useSearchFormClear = (handleFormChange, handleSearchResult) => {
  const handleFormClear = () => {
    handleFormChange('');
    handleSearchResult([]);
  };
  return handleFormClear;
};

const useClearEffect = (searchValue, handleSearchResult) => {
  React.useEffect(() => {
    if (searchValue.length === 0) {
      handleSearchResult([]);
    }
  }, [searchValue]);
};

//==========================

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <h1 className="title">검색</h1>
      </div>
    </header>
  );
};
const SearchForm = ({ value, onChange, onSubmit, onClear }) => {
  return (
    <section className="section-search">
      <div className="container">
        <form className="search-form" id="search-form" onSubmit={onSubmit}>
          <input
            type="text"
            className="search-input"
            id="search-input"
            placeholder="검색어를 입력하세요"
            value={value}
            onChange={e => onChange(e.target.value)}
          />
          <span
            className={`btn-delete ${!value.length ? 'btn-hide' : ''}`}
            id="btn-delete"
            onClick={onClear}
          >
            X
          </span>
        </form>
      </div>
    </section>
  );
};
const SearchTerms = ({ children }) => {
  return (
    <section className="section-search-list">
      <div className="container">{children}</div>
    </section>
  );
};
const Tabs = ({ activeTab, onChange }) => {
  const handleRecommendTabClick = () => {
    onChange(tabs.recommend);
  };
  const handleRecentTabClick = () => {
    onChange(tabs.recent);
  };
  const recommendTabClassName = `tab recommend-tab ${
    activeTab === tabs.recommend ? 'active' : ''
  }`;
  const recentTabClassName = `tab recent-tab ${
    activeTab === tabs.recent ? 'active' : ''
  }`;
  return (
    <div className="search-list-tab">
      <div
        className={recommendTabClassName}
        id="recommend-tab"
        onClick={handleRecommendTabClick}
      >
        추천 검색어
      </div>
      <div
        className={recentTabClassName}
        id="recent-tab"
        onClick={handleRecentTabClick}
      >
        최근 검색어
      </div>
    </div>
  );
};
const Terms = ({ activeTab, terms, onClick }) => {
  console.log(activeTab, terms);
  return (
    <ul className="search-list" id="search-list">
      {terms.map(term => {
        return activeTab === tabs.recommend ? (
          <li key={term.name} className="search-item">
            <span className="search-term" onClick={() => onClick(term.name)}>
              {term.name}
            </span>
          </li>
        ) : (
          <li key={term.name} className="search-item">
            <span className="search-term">{term.name}</span>
            <span className="date">{term.date}</span>
            <span className="btn-delete">X</span>
          </li>
        );
      })}
    </ul>
  );
};
const SearchResult = ({ result }) => {
  return (
    <section className="section-search-result">
      <div className="container">
        <ul className="search-result" id="search-result">
          {result.map(product => (
            <li key={product.name} className="result-item">
              <img src={product.img} alt="item" className="item-image" />
              <p className="item-name">${product.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const products = {
  data: [
    { name: 'Nikon D850', img: './img/d850.png' },
    { name: 'AF-S NIKKOR 58mm f1.4G', img: './img/58n.png' },
    { name: 'AF-S NIKKOR 28mm f1.4G', img: './img/28n.png' }
  ],
  getProducts(name) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data);
      }, 300);
    });
  }
};

const recommendTerms = {
  data: [
    {
      name: 'D850',
      date: ''
    },
    {
      name: '58N',
      date: ''
    },
    {
      name: '28N',
      date: ''
    }
  ],
  getRecommendTerms() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data);
      }, 100);
    });
  }
};

const recentTerms = {
  data: [
    {
      name: 'D5',
      date: '03.30'
    },
    {
      name: '24N',
      date: '03.30'
    },
    {
      name: '35N',
      date: '03.31'
    },
    {
      name: '85N',
      date: '03.31'
    }
  ],
  getRecentTerms() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.data);
      }, 100);
    });
  },
  addRecentTerm(term) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.data = this.data.filter(item => item.name !== term);
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate();
        const newTerm = {
          name: term,
          date: `${month < 10 ? '0' + month : month}.${day}`
        };
        this.data.push(newTerm);
        resolve(newTerm);
      }, 100);
    });
  },
  removeRecentTerm(index) {
    return new Promise(resolve => {
      setTimeout(() => {
        this.data.splice(index, 1);
        resolve(true);
      }, 100);
    });
  }
};

ReactDOM.render(<App />, document.getElementById('root'));
