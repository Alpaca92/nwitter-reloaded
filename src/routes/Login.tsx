import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from '../components/Auth-components';
import GithubButton from '../components/Github-btn';

const errors = {
  'auth/email-already-in-use': 'That email already exists.',
};

export default function Login() {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (email === '' || password === '' || isLoading) return;

    try {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password);
      navigator('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onClick = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Wrapper>
      <Title>Log into 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          value={email}
          name="email"
          placeholder="Email"
          type="email"
          onChange={onChange}
          required
        />
        <Input
          value={password}
          name="password"
          placeholder="Password"
          type="password"
          onChange={onChange}
          required
        />
        <Input type="submit" value={isLoading ? 'Loading' : 'Log in'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{' '}
        <Link to="/create-account">Create one &rarr;</Link>
      </Switcher>
      <div>
        Did you forget your password?
        <button onClick={onClick}></button>
      </div>
      <GithubButton />
    </Wrapper>
  );
}
