import React                from 'react';
import Dialog               from 'material-ui/Dialog';
import FlatButton           from 'material-ui/FlatButton';
import RaisedButton         from 'material-ui/RaisedButton';
import DoubleNavigationChevronRight2        from 'components/chevron-right2.jsx';
import DoubleNavigationChevronRight         from 'material-ui/svg-icons/navigation/chevron-right';
import DoubleNavigationChevronLeft2         from 'components/chevron-left2.jsx';
import DoubleNavigationChevronLeft          from 'material-ui/svg-icons/navigation/chevron-left';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, } from 'material-ui/Table';

export default class FilterDlg extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: this.props.filter,
            selectedSrc:[],
            selectedDst:[],
            displayedCurrencies: this.props.currencies,
            filteredCurrencies:  []
        };
    }

    onRowSelectionSrc(rows){
        this.setState({ selectedSrc: rows }, () => {
            this.tableBodySrc.setState({ selectedRows: rows });
            this.tableBodyDst.setState({ selectedRows: this.state.selectedDst });
        });
    }

    onRowSelectionDst(rows){
        this.setState({ selectedDst: rows }, () => {
            this.tableBodyDst.setState({ selectedRows: rows });
            this.tableBodySrc.setState({ selectedRows: this.state.selectedSrc });
        });
    }

    handleLeft2RightAll() {
        let flt = [];

        this.props.currencies.map( i => {
            flt.push(i.CharCode);
            }
        );
        this.setState({ filter: flt,
                        displayedCurrencies: [],
                        selectedSrc:[],
                        filteredCurrencies:  this.props.currencies
        }, () => {
            this.tableBodySrc.setState({ selectedRows: [] });
            this.tableBodyDst.setState({ selectedRows: this.state.selectedDst });
        });
    }

    handleLeft2Right() {
        let flt = this.state.filter;
        this.state.selectedSrc.map(i =>{
            flt.push(this.state.displayedCurrencies[i].CharCode);
        });

        this.setState({ selectedSrc: [],
            displayedCurrencies: this.props.currencies.filter( item => {
                return flt.indexOf(item.CharCode) === -1;
            }),
            filteredCurrencies:  this.props.currencies.filter(item => {
                return flt.indexOf(item.CharCode) !== -1;
            }),
            filter: flt
        }, () => {
            this.tableBodySrc.setState({ selectedRows: [] });
            this.tableBodyDst.setState({ selectedRows: this.state.selectedDst });
        });
    }

    handleRight2LeftAll() {
        this.setState({ filter: [],
            selectedDst: [],
            displayedCurrencies:this.props.currencies,
            filteredCurrencies: []}
            , () => {
            this.tableBodyDst.setState({ selectedRows: [] });
            this.tableBodySrc.setState({ selectedRows: this.state.selectedSrc });
        });
    }

    handleRight2Left() {
        let flt = this.state.filter;
        this.state.selectedDst.map(i =>{
            let ind = flt.indexOf(this.state.filteredCurrencies[i].CharCode);
            if (ind !== -1) {
                flt.splice(ind, 1);
            }
        });

        this.setState({
            selectedDst: [],
            displayedCurrencies: this.props.currencies.filter( item => {
                return flt.indexOf(item.CharCode) === -1;
            }),
            filteredCurrencies:  this.props.currencies.filter(item => {
                return flt.indexOf(item.CharCode) !== -1;
            }),
            filter: flt
        }, () => {
            this.tableBodyDst.setState({ selectedRows: [] });
            this.tableBodySrc.setState({ selectedRows: this.state.selectedSrc });
        });
    }

    componentWillReceiveProps(nextProps) {

        this.setState({ selectedDst: [],
            displayedCurrencies: nextProps.currencies.filter( item => {
                return this.state.filter.indexOf(item.CharCode) === -1;
            }),
            filteredCurrencies:  nextProps.currencies.filter(item => {
                return this.state.filter.indexOf(item.CharCode) !== -1;
            }),
        });
    }

    componentWillMount() {
        this.setState({filter: this.props.filter});
    }

    handleOnOk() {
        this.props.onOk(this.state.filter);
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.props.onClose}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleOnOk.bind(this)}
            />,
        ];

        const style = {
            margin: 12,
        };

        const customContentStyle = {
            width: '90%',
            maxWidth: 'none',
        };

        let srcRows = this.state.displayedCurrencies.map( item => {
            return (
                <TableRow key={item.ID}>
                    <TableRowColumn>{item.CharCode}</TableRowColumn>
                    <TableRowColumn>{item.Name}</TableRowColumn>
                </TableRow>
            )
        });

        let dstRows = this.state.filteredCurrencies.map( item => {
            return (
                <TableRow key={item.ID}>
                    <TableRowColumn>{item.CharCode}</TableRowColumn>
                    <TableRowColumn>{item.Name}</TableRowColumn>
                </TableRow>
            )
        });

        return (
            <div>
                <Dialog
                    title="Filter"
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.props.onClose}
                    autoScrollBodyContent={true}
                    contentStyle={customContentStyle}
                >
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <h3>Available</h3>
                        <Table multiSelectable={true}
                               height={'300px'}
                               onRowSelection={this.onRowSelectionSrc.bind(this)}
                        >
                            <TableHeader
                                displaySelectAll={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn>Code</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody deselectOnClickaway={false}
                                       ref={(tableBody) => { this.tableBodySrc = tableBody; }}
                            >
                                {srcRows}
                            </TableBody>
                        </Table>
                            </td>
                            <td>
                    <div>
                        <RaisedButton
                            icon={<DoubleNavigationChevronRight2 />}
                            style={style}
                            onClick={this.handleLeft2RightAll.bind(this)}
                            disabled={this.state.displayedCurrencies.length === 0}
                        /><br/>
                        <RaisedButton
                            icon={<DoubleNavigationChevronRight />}
                            style={style}
                            onClick={this.handleLeft2Right.bind(this)}
                            disabled={this.state.selectedSrc.length === 0}
                        /><br/>
                        <RaisedButton
                            icon={<DoubleNavigationChevronLeft />}
                            style={style}
                            onClick={this.handleRight2Left.bind(this)}
                            disabled={this.state.selectedDst.length === 0}
                        /><br/>
                        <RaisedButton
                            icon={<DoubleNavigationChevronLeft2 />}
                            style={style}
                            onClick={this.handleRight2LeftAll.bind(this)}
                            disabled={this.state.filteredCurrencies.length === 0}
                        />
                    </div>
                            </td>
                            <td>
                                <h3>Selected</h3>
                        <Table multiSelectable={true}
                               height={'300px'}
                               onRowSelection={this.onRowSelectionDst.bind(this)}
                        >
                            <TableHeader
                                displaySelectAll={false}
                            >
                                <TableRow>
                                    <TableHeaderColumn>Code</TableHeaderColumn>
                                    <TableHeaderColumn>Name</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody deselectOnClickaway={false}
                                       ref={(tableBody) => { this.tableBodyDst = tableBody; }}
                            >
                                {dstRows}
                            </TableBody>
                        </Table>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </Dialog>
            </div>
        );
    }
}