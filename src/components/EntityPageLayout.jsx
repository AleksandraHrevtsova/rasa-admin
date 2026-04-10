import { FAB } from './Fab';
import { Loading } from './Loading';

export function EntityPageLayout(props) {
  const { title, actions, table, loading, fab } = props;
  
  return (
    <>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-blue-950">
              {title}
            </h1>

            {actions?.left}
          </div>
          <div className="hidden md:flex items-center gap-2">
            {actions?.right}
          </div>
        </div>
        {loading ? <Loading /> : table}
      </div>
      {fab && (<FAB label={fab.label} onClick={fab.onClick} />)}
    </>
  );
}