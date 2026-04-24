export function DataTableSkeleton({ columns = [], rows = 8 }) {
  return (
    <tbody>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i} className='border-b'>
          {columns?.map((col, ci) => {
            let w = '80%';
            if (ci === 0) w = '60%';
            if (ci === columns.length - 1) w = '30%';

            return (
              <td key={col.key || ci} className='p-3'>
                <div 
                  className='h-4 rounded shimmer'
                  style={{ width: w }}
                />
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}