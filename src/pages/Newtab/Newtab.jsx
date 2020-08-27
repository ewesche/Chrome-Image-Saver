import React, {Component} from 'react';
import {connect} from 'react-redux';
import './Newtab.css';
import './Newtab.scss';
import './index.css';
import {  Button, Input, Layout, Menu, Breadcrumb, Dropdown, Popover,
  Row, Col, Card
} from 'antd';
import Drop from './Drop'


const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;



class Newtab extends Component {
  constructor(props) {
    super(props);
    this.state = { visible_images: {images: []},
                    selected_key: -1, selected_node: {}, selected_keys: [], selected_nodes: [],
                    checked_nodes: []}
    this.baseState = this.state
  }

  componentDidMount() {
    document.addEventListener("keydown", this.onKeyPress, false);
  }
  componentWillUnmount(){
    document.removeEventListener("keydown", this.onKeyPress, false);
  }

  updateChecked = (checkedNodes) => {
    let checked = checkedNodes.filter(node => node.img_url !== 'folder')
    this.setState({checked_nodes: checked, visible_images: {images: []}, selected_nodes: [] } )
    console.log(checked)
  }

  displayImages = (tdata) => {
    let imgs = []
    if ('children' in tdata.node && tdata.selected) {
      imgs = tdata.node.children.filter(node => node.img_url !== 'folder')
      this.setState({visible_images: {images: imgs}, selected_nodes: [] } )
    }
    else {
      this.setState({visible_images: {images: []}})
    }
  }

  onChange = (tdata) => {
          this.props.dispatch({
            type: 'UPDATE_TREE',
            payload: tdata
      });
  }

  handleEnter = (e) => {
    e.preventDefault()
    let payload = {title: e.target.value + ' - folder', img_url: 'folder', link_url: ''}
    this.props.dispatch({
        type: 'ADD_COUNT',
      });
    console.log(payload)
      this.props.dispatch({
        type: 'INSERT_DATA',
        payload: payload,
      });
  }

  getSelectedKey = (key, selected) => {
    if(selected) {
      this.setState({selected_key: key})
    }
    else{
      this.setState({selected_key: -1})
    }
  }

  getSelectedKeys = (selected, selected_nodes) => {
    if(selected.length!==0) {
      let imgs = selected_nodes.filter(node => node.img_url!=='folder')
      this.setState({selected_keys: selected, selected_nodes: imgs, visible_images: {images: []} })
    }
    else{
      this.setState({selected_keys: [], selected_nodes: [], visible_images: {images: []}})
    }
  }

  getSelectedNode = (info) => {
    if(!info.selected) {
      this.setState({ selected_node: {} })
    }
    else if(info.selected && info.node.img_url !== 'folder') {
      this.setState({selected_node: info.node, visible_images: {images: []}})
    }
    else{
         // this.setState({ visible_images: {images: []} })
    }
  }
  onClick = (check) => {
    if(check==='delete') {
      // this.props.dispatch({
      //   type: 'DELETE_NODE',
      //   payload: this.state.selected_key
      // });
      // this.setState({selected_key: -1})

      this.props.dispatch({
        type: 'DELETE_NODE',
        payload: this.state.selected_keys
      });
      let filtered_nodes = this.state.selected_nodes.filter((node => !this.state.selected_keys.includes(node.key) ))
      this.setState({selected_key: [], selected_nodes: filtered_nodes})
    }
    else {
      this.props.dispatch({
        type: 'CLEAR_ALL',
      });
      this.setState(this.baseState)
    }
  }

  changeName = (e) => {
    let name = '';
    while(true) {
      let product = prompt("Please enter name");
      if(product==='') {
        alert('empty')
      }
      else if (product) {
          name = product
        break;
      }
      else{
        alert('cancelled')
        break;
      }
    }
    if(name!=='' && this.state.selected_keys.length > 0) {
      console.log('exe')
      console.log(this.state.selected_keys)
      this.props.dispatch({
        type: 'CHANGE_NAME',
        payload: {name: name, key: this.state.selected_keys[this.state.selected_keys.length - 1]}
      });
    }
  }
  onKeyPress = (event) => {
    if(this.state.selected_keys.length!==0 && event.key==='x' && event.keyCode===88){
      this.props.dispatch({
            type: 'DELETE_NODE',
            payload: this.state.selected_keys
      });
      this.setState({selected_keys: [], selected_node: {}})
    }
  }

  render() {
    // console.log(this.props.data.treeData)
    // console.log('data')
    const selected_url = Object.keys(this.state.selected_node).length===0 ? '' : this.state.selected_node.img_url;
    const selected_nodes = this.state.selected_nodes;
    return (

      <div onKeyPress={this.onKeyPress} >
      <Layout>
        <Header title={'space'}>
          <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
        </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title={<span>subnav 1</span>}>
              <Menu.Item key="1" content ={'helllo'}>option1</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{
          background: '#fff', padding: 24, margin: 0, minHeight: 280,
        }}
        >
          <Row gutter={[16,16]}>
            <Col span={10} >
              <p style={{fontSize: '11.5px'}}>You can add items by going to a page, hovering over an image, and pressing the 'd' key,
              then click the button and specify the name of the item in the popup window. Use the checkboxes
              to see the products. You can click on the product text and drag to move them or drop them into
                different folders.</p>
              <hr style={{border: '2px solid black'}} />
              <p style={{fontSize: '11.5px'}}>Type folder name and press Enter to add folder. Click the text of
              an item to select it, then you can delete that item or change the name
                by pressing the buttons, or you can press 'x' to delete an item that is selected.</p>
              <br />


              <Row>
                <>
                  <Button onClick={() => this.onClick('delete')}>delete</Button>
                  <Button onClick={() => this.onClick('clear')}>clear all</Button>
                  <Button onClick={this.changeName}>Change Name</Button>
                </>
              </Row>
              <Input allowClear placeholder="name of folder" onPressEnter={this.handleEnter} />
              <Drop onChange={this.onChange} displayImages={this.displayImages} data={this.props.data.treeData}
                    getSelectedKey={this.getSelectedKey} getSelectedKeys={this.getSelectedKeys}
                    getSelectedNode={this.getSelectedNode} updateChecked={this.updateChecked}/>
            </Col>
            <Col span={50}>
              <div>

                {this.state.checked_nodes.map((value, index) => {
                  if(this.state.checked_nodes.length!==0) {
                    return <ul>
                      <Card style={{width: 240}} bodyStyle={{padding: 0}}>
                        <div className="custom-image">
                          <img src={value.img_url} key={index} style={{width: '100%', height: '100%'}}></img>
                        </div>
                        <div className="custom-card">
                          <h3>{value.title}</h3>
                          <p><a href={value.link_url}>link</a></p>
                        </div>
                      </Card>
                    </ul>
                  }
                  else return <div></div>
                })}

            </div>
            </Col>
          </Row>
        </Content>

      </Layout>
    </Layout>
  </Layout>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count,
    data: state.data
  };
};

function get_children(array){
  let x;
  let temp = []

  for (let i=0; i<array.length; i++) {
    if(x.img_url!=='folder'){
      temp.concat(x)
    }
  }
  return array
}

export default connect(mapStateToProps)(Newtab);
