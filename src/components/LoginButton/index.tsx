import * as React from 'react';
import { Button } from 'react-bootstrap';

import { makeApiURL } from '../../api';
import { gettext } from '../../utils';
import styles from './styles.module.scss';

type PublicProps = {};

type DefaultProps = {
  _window: typeof window;
  fxaConfig: string;
  isLocalDev: boolean;
};

type Props = PublicProps & DefaultProps;

export class LoginButtonBase extends React.Component<Props> {
  static defaultProps: DefaultProps = {
    _window: window,
    fxaConfig: process.env.REACT_APP_FXA_CONFIG as string,
    isLocalDev: process.env.REACT_APP_IS_LOCAL_DEV === 'true',
  };

  getFxaURL() {
    const { _window, fxaConfig, isLocalDev } = this.props;
    let { href } = _window.location;

    // We use a relative URL when we run the app locally.
    if (isLocalDev) {
      href = href.replace(_window.location.origin, '');
    }

    return makeApiURL({
      path: `/accounts/login/start/?config=${fxaConfig}&to=${href}`,
    });
  }

  render() {
    return (
      <Button size="sm" href={this.getFxaURL()} className={styles.link}>
        {gettext('Log in')}
      </Button>
    );
  }
}

export default LoginButtonBase;
