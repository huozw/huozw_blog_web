import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import axios from 'axios';
// require('../setupProxy');

export default () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    axios.post('/api/users/signup', {
      name,
      password,
    });
  };

  const login = () => {
    axios.post('/api/users/login', {
      name,
      password,
    });
  };

  return (
    <div>
      <Input onChange={e => setName(e.target.value)} value={name} />
      <Input type="password" onChange={e => setPassword(e.target.value)} value={password} />
      <Button onClick={submit}>注册</Button>
      <Button onClick={login}>登录</Button>
    </div>
  );
};
