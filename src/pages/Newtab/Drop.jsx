import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
// import './index.css';
import { Tree, Switch, Button } from 'antd';
// import { CarryOutOutlined, FormOutlined } from '@ant-design/icons';
import {AppstoreOutlined} from '@ant-design/icons';

const x = 3;
const y = 2;
const z = 1;
const gData = [
                {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        // content:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAilBMVEXeACn////bAADeACX+9PbdABvdABXdAB//+/zqgorgKjzvp6vcAAndABL20NLmZ3H87u/0wsbkVmLsi5LgLUD86ez64OL1ycveACPzvMHlXGjdABjunaPeFi7wrLDrho7tlJriPk7oeIDjR1bnbnfys7jgKz7tmZ/429zpfIXkUF3fHjTjUl3vo6hmIV52AAAD00lEQVR4nO3b63qiOgCFYQgCdoRW6wmKoj1YO+3u/d/eGByVJKCdjCPS/b0/g09wmQAhiY4DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAXBlPUVH2z7+An8XRVuAn569/Pir74ZllxcdEjXhzLFNKlNrjsqAqXiZen2bpoJD2Fs8iVn7SoMy3CRi+uGXTaFPmL5Sy0eaU2bhfqbOKHX85KRlH5YCDkjTPjNMH2XqsnMztrD5KNSR57yAf2kQM75T6B0XCG6VMtmvs1kgjJ+gpJeVGFG7tIckTy6o6V9G+r6rnvY2cP/fVhF27hN3aQ/LczqS60v5o11jtThiO6ip13Wf/GyT05vUBXfc1aX9Cod1iVGPR+oTx+lhA153FLU/o+ccDuq7vtTthMDuVcJm1O+Hxq1CaiFYn9D5OBXRdxxhpXC7h+DBG6wVWCbXBovz2U73kIWkuoTrytkmYacO1t01VkTbCufGbS6i+4lgl1G409+HmtA9q2bDJhOoLzhna8H7zo4VawkWrE/rD0wkb7aUtTpgWt4+nEwlFtJO1LmF3++Z+IuH+tX26ztqWsMqxJ76c9SAhCUlIQhKSkIQkJOG1J7xtXcJJL8/znjplYiacH3htSzgQQRyLnycShsoCccsSfvs34GtLGOb5pdaAzz0TpSX8Tya8NxOeYx3fJmGQ+TvJeWYTn2LHiW60skOgv9kQYpXwZm/xnhgJS5sy9IRBVvCdTF9bexDiTnsi3f+elvWF/zoXke0+lL9dt/g0ZvWnt78JI+F6trXMfPV2vdE1zjAvGi4RQzkX3hk86/scLpRwZiTcMxPu9EXyWFPfwXYVOHjeT4ulwqqvNpJw8+VrK9zL5SKwMtN/a9WKTSWMBqcSPiZyN4NSlDexfmheh19LqD/8DG/FAulKLfyw6KdNtaEjanYL7cgnpLEVa2buG7vehMn70YAD2YTGZ2yuxMYSOiI/ErCTyf7oP2nF/QYS2l6HMuJbfcLH4vlurIWP25XQi2svxfftgM14ak4tbqbN9VK5+dLYnVDo7Lcmir56ZGEx9v7HbVh9ZN/ZhH6hSat4PwTVXkG6ds/DbuegmxYDiZ9KmdwjHPQ7lbrrzMk+u5XHvpDQ8YNP7bcbPJYHZ+oz5cXu9cnYti1H82XFCev2eReLwNWHitqrHTJ4cfSS7vZHdaZDRyjvEJ5T6qdLy7F348JYZB9yF30oIl8ftCRBuot/Z9NHr0b9/x48MVrfjifpiwgv/aUuxpP/doi/bz4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD/9gvbgm7NNhQqJQAAAABJRU5ErkJggg==',
      },
      {
        title: 'leaf',
        key: '0-0-1',
      },
    ],
  },

              ];

// const generateData = (_level, _preKey, _tns) => {
//   const preKey = _preKey || '0';
//   const tns = _tns || gData;
//
//   const children = [];
//   for (let i = 0; i < x; i++) {
//     const key = `${preKey}-${i}`;
//     tns.push({ title: key, key });
//     if (i < y) {
//       children.push(key);
//     }
//   }
//   if (_level < 0) {
//     return tns;
//   }
//   const level = _level - 1;
//   children.forEach((key, index) => {
//     tns[index].children = [];
//     return generateData(level, key, tns[index].children);
//   });
// };
// generateData(z);

class Drop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: ['0'],
    };
    // console.log('this is gdata')
    // console.log(this.props.data)
  }
  onDragEnter = info => {
    // console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  };

  onDrop = info => {
    // console.log(info);
    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
           loop(data[i].children, key, callback);
        }
      }
    };
    const data = [...this.props.data];

    // Find dragObject
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.children.push(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }

    this.props.onChange(data)
  };

  onSelect = (selectedKeys, info) => {
    // console.log('selected', info);
    // console.log('selected keys \n', selectedKeys);
    // console.log('selected nodes \n', info);
    // let len = info.selectedNodes.length
    // console.log(len)
    // if(len > 0 && info.selectedNodes[len-1].img_url === 'folder') {
    //   console.log('display images')
    //   this.props.displayImages(info)
    // }
    // else{
      this.props.getSelectedKeys(selectedKeys, info.selectedNodes)
    // }
    //   this.props.getSelectedKey(info.node.key, info.selected)
    //   this.props.getSelectedNode(info)
  };

  onCheck = (keys, e) => {
    console.log(e.checkedNodes)
    this.props.updateChecked(e.checkedNodes)
  }

  render() {
    return (
      <Tree
        className="draggable-tree"
        defaultExpandedKeys={this.state.expandedKeys}
        draggable
        blockNode
        onDragEnter={this.onDragEnter}
        onDrop={this.onDrop}
        treeData={this.props.data}
        onSelect={this.onSelect}
        multiple={true}
        checkable={true}
        onCheck={this.onCheck}
      />
    );
  }
}

export default Drop;
