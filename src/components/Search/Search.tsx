import './Search.css';

function Search() {
  return (
    <div className="SearchContainer">
      <div className="SearchBox">
        <input
          type="text"
          placeholder="Nome do produto ou laboratório"
          className="SearchInput"
        />
        <div className="DropDown">
          <button className="DropButton">Filtrar por</button>
          <div className="DropDownContent">
            <a href="#">Data de publicação</a>
            <a href="#">Ordem alfabética</a>
          </div>
        </div>
      </div>
      <div className="NewMedicationBtnContainer">
        <button className='NewMedicationButton'>Novo Medicamento</button>
      </div>
    </div>
  );
}

export default Search;
