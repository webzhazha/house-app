import React from 'react';
import ReactEcharts from 'echarts-for-react';
import {Icon,Tab,Dropdown,Input,Grid,Button } from 'semantic-ui-react';
import './calculator.scss'

class Chart extends React.Component {
    getOption = () => {
        const {chartData} = this.props;
        return {
          title : {
            text: '贷款数据统计',
            // subtext: '纯属虚构',
            x:'center'
          },
          tooltip : {
            trigger: 'item',
            formatter: "{c}"
            // formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['贷款总额','支付利息']
          },
          series : [{
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data: chartData,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }
      }
    render(){
        return (
            <ReactEcharts option={this.getOption()} />
        )
    }
}

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state={
            type: '',
            year: '',
            rate: "",
            chartData: []
        }
    }
    handleType= (e,{value})=>{
        this.setState({
            type: value
        })
    }
    handleYear= (e, {value})=>{
        this.setState({
            year: value
        })
    }
    handleRate= (e,{value})=>{
        this.setState({
            rate: value
        })
    }
    calc=()=>{
        // 赋值
        this.setState({
            chartData: [
                {value:335, name:'贷款总额'},
                {value:310, name:'支付利息'},
                {value:200, name:'利息'}
              ]
        })
    }
    render(){
        const types = [
            { key: 1, text: '按房间总额', value: 1 },
            { key: 2, text: '按贷款总额', value: 2 },
          ]
        const years = (n) => {
            let arr = [];
            for(let i=1;i<=n;i++) {
              arr.push({
                key : i,
                text: i,
                value: i
              });
            }
            return arr;
          }
        const rates = [
            {key: 1,text: '基准利率(3.25%)',value: 1},
            {key: 2,text: '基准利率9.5折',value: 2},
            {key: 3,text: '基准利率9折',value: 3},
            {key: 4,text: '基准利率8.5折',value: 4}
          ]
        const First = () => {
            const {type,year,rate} = this.state;
            return (
              <Grid columns={2}>
                <Grid.Row className='first'>
                  <Grid.Column width={6}>
                    贷款方式
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Dropdown
                      onChange={this.handleType}
                      options={types}
                      placeholder='选择贷款方式'
                      selection
                      value={type}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={6}>
                    贷款总额
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Input className='calc-first-total' placeholder='贷款总额' />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={6}>
                    贷款年限
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Dropdown
                      onChange={this.handleYear}
                      options={years(25)}
                      placeholder='请选择年限'
                      selection
                      value={year}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={6}>
                    贷款利率
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Dropdown
                      onChange={this.handleRate}
                      options={rates}
                      placeholder='请选择利率'
                      selection
                      value={rate}
                    />
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={16}>
                    <Button  fluid color='green' onClick={this.calc}>计算</Button>
                  </Grid.Column>
                </Grid.Row>
                <div className='calc-chart'>
                  <Chart chartData={this.state.chartData}/>
                </div>
              </Grid>
            );
          }
        const panes = [
            { menuItem: '公积金贷款', render: () => <Tab.Pane><First/></Tab.Pane> },
            { menuItem: '商业贷款', render: () => <Tab.Pane>商业贷款</Tab.Pane> },
            { menuItem: '组合贷款', render: () => <Tab.Pane>组合贷款</Tab.Pane> },
        ]
        return (
            <div className='home-calc'>
                <div className = "home-calc-title">
                <Icon name='angle left' size = 'large' onClick={this.props.gridChange}/>贷款利率计算 
                </div> 
                <div className = "map-calc-content">
                <Tab className='home-calc-label' panes={panes} />
                </div>
            </div>
        )
    }
}

export default Calculator