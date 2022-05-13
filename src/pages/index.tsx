import styles from './index.less';
import { Link } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      <Link to='/base'>base demo</Link><br/>
      <Link to='/login'>login demo</Link><br/>
      <Link to='/register'>register demo</Link><br/>
      <Link to='/detail'>detail demo</Link><br/>
      <Link to='/controller'>controller demo</Link><br/>
      <Link to='/calc-relation'>联动计算</Link><br/>
    </div>
  );
}
