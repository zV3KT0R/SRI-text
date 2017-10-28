import React from 'react';
import { bindActionCreators }   from 'redux';
import {connect}                from 'react-redux'
import { Switch, Route, withRouter }        from 'react-router-dom'

import AppBar               from 'material-ui/AppBar';
import DatePicker           from 'material-ui/DatePicker';
import IconButton           from 'material-ui/IconButton';
import CircularProgress     from 'material-ui/CircularProgress';
import ContentFilterList    from 'material-ui/svg-icons/content/filter-list';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';

import FilterDlg            from 'containers/zFilterDlg.jsx';

import {jsonParse, jsonStringify}  from 'utils'

import * as actions from 'actions';

export class CurrencyApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filter_open: false,
            filter: jsonParse(localStorage.getItem('filter')) || ['USD', 'EUR']
        };
    }

    handleShowFilter() {
        this.setState({ filter_open: true });
    }
    handleCloseFilter() {
        this.setState({ filter_open: false });
    }
    handleApplyFilter(filter) {
        localStorage.setItem('filter', jsonStringify(filter));
        this.setState({ filter_open: false, filter: filter});
    }

    handleChangeFltDt(event, date) {
        this.props.actions.load(date);
    }

    componentWillMount() {
        this.props.actions.load(this.props.flt_dt);
    }

    renderTable() {
        let rows = this.props.currencies.filter(item => {
            return this.state.filter.indexOf(item.CharCode) !== -1;
        })
            .map( item => {
                return (
                    <TableRow key={item.ID}>
                        <TableRowColumn>{item.CharCode}</TableRowColumn>
                        <TableRowColumn>{item.Name}</TableRowColumn>
                        <TableRowColumn>{item.Value}</TableRowColumn>
                    </TableRow>
                )
            });


        return (
            <Table>
                <TableHeader displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>Code</TableHeaderColumn>
                        <TableHeaderColumn>Name</TableHeaderColumn>
                        <TableHeaderColumn>Value</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {rows}
                </TableBody>
            </Table>
        );
    }

    render() {

        let btnFilter = (
            <Toolbar style={{backgroundColor: null}}>
                <ToolbarGroup firstChild={true}>

                    <DatePicker
                        hintText="Date"
                        value={this.props.flt_dt}
                        onChange={this.handleChangeFltDt.bind(this)}
                    />
                    <IconButton label="Filter" onClick={this.handleShowFilter.bind(this)}> <ContentFilterList /> </IconButton>
                </ToolbarGroup>
            </Toolbar>
        );

        return (
            <div>

                <FilterDlg open={this.state.filter_open}
                           onClose={this.handleCloseFilter.bind(this)}
                           onOk={this.handleApplyFilter.bind(this)}
                           currencies={this.props.currencies}
                           filter={this.state.filter}
                           ref={(dlg) => { this.fltDlg = dlg; }}
                />

                <AppBar
                    title="Currency"
                    iconElementLeft={<div/>}
                    iconElementRight={btnFilter}
                />

                {
                    this.props.inProgress
                        ?
                        <CircularProgress size={80} thickness={5} />
                        :
                        this.renderTable()

                }

            </div>
        );
    }

}

function mapStateToProps(state) {

    return {
        currencies :    state.currencies,
        filter :        state.filter,
        inProgress :    state.inProgress,
        flt_dt:         state.flt_dt
    }
}

function actionsStateToProps(dispatch) {

    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, actionsStateToProps, null, {pure: false})(withRouter(CurrencyApp));