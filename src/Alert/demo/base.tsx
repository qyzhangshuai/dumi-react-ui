/**
 * @description: 
 * @author: zs
 * @Date: 2020-11-29 21:46:17
 * @LastEditTime: 2020-11-30 23:37:20
 * @LastEditors: zs
 */
import React from 'react';
import { Alert } from 'dumi-react-ui';
import { Button } from 'antd'
import 'antd/lib/button/style'
import 'dumi-react-ui/lib/Alert/style'

export default () => {
  return <>
    <Button type='primary'>按钮</Button>
    <Alert kind="warning">这是一条警告提示</Alert>;
  </>
}