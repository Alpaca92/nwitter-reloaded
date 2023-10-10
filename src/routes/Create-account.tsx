import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

export default function CreateAccount() {
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (name === '' || email === '' || password === '' || isLoading) return;

    try {
      setIsLoading(true);

      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigator('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          value={name}
          name="name"
          placeholder="Name"
          type="text"
          onChange={onChange}
          required
        />
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
        <Input type="submit" value={isLoading ? 'Loading' : 'Create Account'} />
      </Form>
      {error !== '' ? <Error>{error}</Error> : null}
      <Switcher>
        Already have an account? <Link to="/login">Log in &rarr;</Link>
      </Switcher>
      <GithubButton />
    </Wrapper>
  );
}
