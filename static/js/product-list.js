import React from 'react';

class ProductRow extends React.Component{
    render(){
        var data = this.props.data.fields;
        return (
                <div className="col-sm-4 col-lg-4 col-md-4">
                    <div className="thumbnail">
                        <img src={data.image? data.image :'/static/image/image_not_found.jpg'}  className="img-responsive" style={{'height':'150px'}}/>
                        <div className="caption">
                            <h4 className="pull-right">{data.price}</h4>
                            <h4><a href={"/product/"+this.props.data.pk+"/"+data.slug+"/"} >{data.name}</a></h4>
                            <p>{data.description}</p>
                            <p>{data.stock? data.stock + ' in Stock' : 'Out of Stock'}</p>
                        </div>
                    </div>
                </div>
        );
    }
}


class ProductList extends React.Component{

    render(){
       var rows = [];
       var filterText=this.props.filterText;
       this.props.data.map(function(product){

            if (product.fields.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1 ){
                return;
            }
            rows.push(<ProductRow data={product} key={product.pk} />);
        });

        return (
            <div className="row">{rows}</div>
        );
    }
}


class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
    }
    searchHandler(e){
        this.props.onUserInput (e.target.value);
    }

    render(){
        return(
            <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                    <div id="imaginary_container">
                        <div className="input-group stylish-input-group">
                            <input type="text" placeholder="Search" className="form-control" onChange={this.searchHandler} value={this.props.filterText}/>
                            <span className="input-group-addon">
                            <button type="submit">
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

class FilterableProduct extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          filterText: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch(filterText){
        this.setState({filterText: filterText});
    }

    render(){
        return(
        <div>
            <SearchBar onUserInput={this.handleSearch} filterText={this.state.filterText} />
            <ProductList data={this.props.data} filterText={this.state.filterText} />
        </div>
        );

    }



}



module.exports = FilterableProduct