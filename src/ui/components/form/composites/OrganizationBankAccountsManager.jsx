import { useState } from 'react';
import { Plus } from 'lucide-react';
import { BankAccountCard } from './BankAccountCard';
import { useI18n } from '@/ui/hooks/useI18n';

export function OrganizationBankAccountsManager({
  derived,
  isEdit,
}) {
  const { t, k } = useI18n();
  const [showCreate, setShowCreate] = useState(false);

  const accounts = derived.bankAccounts || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {t(k.requisites.backAccounts)}
        </h3>

        {isEdit && (
          <button
            type="button"
            onClick={() => setShowCreate(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />

            {/* <span>
              Добавить счет
            </span> */}
          </button>
        )}
      </div>

      {!accounts.length && (
        <div className="border rounded-lg p-4 text-sm text-gray-500">
          {t(k.requisites.noBackAccounts)}
        </div>
      )}

      <div className="grid gap-3">
        {accounts.map(account => (
          <BankAccountCard
            key={account.id}
            account={account}
            organizationName={derived.organizationName}
            onEdit={() => {}}
            onActivate={() => {}}
            onDeactivate={() => {}}
          />
        ))}
      </div>

      {showCreate && (
        <BankAccountEditor
          organizationId={derived.organizationId}
          onClose={() => setShowCreate(false)}
        />
      )}
    </div>
  );
}