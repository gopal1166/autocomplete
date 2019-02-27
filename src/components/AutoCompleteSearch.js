/*
  AutocompleteComponent from antd
  Input: filtered_customers
  output: customer_id   on selection of customer

  We can search the customer by name.
*/

import React from 'react';
import { Card, AutoComplete } from 'antd';

const Option = AutoComplete.Option;

class AutoCompleteSearch extends React.Component {
  state = {
    customers: [
      {key: 1, value: 1, label: "BMW"},
      {key: 2, value: 2, label: "Audi"}
    ],
    filtered_customers: [
      {key: 1, value: 1, label: "BMW"},
      {key: 2, value: 2, label: "Audi"}
    ],
    customer_id: null
  }

  handleSearch = (value) => {
    if (!value) {
      this.setState({ filtered_customers: this.state.customers })
    } else {
          const customers  = this.state.customers
          let filtered_customers = []

          filtered_customers = customers.map(obj => {
            if (obj.label.includes(value)) {
              return {
                key: obj.key,
                label: obj.label,
                value: obj.value
              }
            }
          })

          let modified_list = []
          for (var i = 0; i < filtered_customers.length; i++) {
            if (filtered_customers[i]) {
              modified_list.push(filtered_customers[i])
            }
          }

          this.setState({ filtered_customers: modified_list})
    }
  }

  onSelect = (value) => {
    this.setState({ customer_id: value })
    console.log("value", value);
  }

  render() {
    let filtered_customers = null
    let autoComplete = null
    let children = null
    if (this.state.filtered_customers) {
      filtered_customers = this.state.filtered_customers
      children = filtered_customers.map(obj => {
        return <Option key={obj.key}>{obj.label}</Option>
      })

      autoComplete = (
        <AutoComplete
          style={{ width: "100%" }}
          onSelect={this.onSelect}
          onSearch={this.handleSearch}
          placeholder="Seach customer here"
        >
          { children }
        </AutoComplete>
      )
    }

    return (
      <div style={{ width: "30%"}}>
        { autoComplete }
      </div>
    )
  }
}

export default AutoCompleteSearch;
