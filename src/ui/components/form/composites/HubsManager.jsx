import { useLocation, useNavigate } from 'react-router';
import { NAV } from '@/config/constants';
import { buildPath } from '@/core/utils/navigation';
import { FormFieldContainer } from '@/ui/components/form/FormFieldContainer';
import { styleTokens } from '@/ui/tokens/form.tokens';

export function HubsManager({ node, derived }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenHub = (id) => {
    const path = buildPath(NAV.editUser, { id });
    const state = { from: location.pathname };
    navigate(path, { state });
  };

  return (
    <FormFieldContainer label={node.label} required={node.required || node.validation}>
      <div className={styleTokens.rowsContainer}>
        {derived.hubsView?.map(el => (
          <RowField key={el.id} el={el} onClick={handleOpenHub} />
        ))}
      </div>
    </FormFieldContainer>
  );
}

const RowField = ({ el, onClick }) => (
  <div onClick={() => onClick(el.id)} className={styleTokens.rowField}>
    <span>{el.name}</span>
    <span>{el.address}</span>
  </div>
)