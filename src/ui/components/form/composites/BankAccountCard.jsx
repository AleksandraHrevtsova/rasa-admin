import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { useNotify } from '@/ui/hooks/useNotify';
import { useI18n } from '@/ui/hooks/useI18n';

import { IconAction } from '@/ui/components/table/actions/IconAction';
import { buttonActionTypes } from '@/config/constants';
import { copyData } from '@/core/utils/copyData';

export function BankAccountCard({
  account,
  organizationName,
  onEdit,
  onActivate,
  onDeactivate,
}) {
  const { t, k, locale } = useI18n();
  const notify = useNotify();
  const [copied, setCopied] = useState(false);

  const copyRequisites = async () => {
    const text = [
      organizationName && `${t(k.requisites.payee)} ${organizationName}`,
      account.bankName && `${t(k.requisites.bankName)} ${account.bankName}`,
      account.iban && `${t(k.requisites.iban)} ${account.iban}`,
      // account.validFrom &&
      //   `${t(k.requisites.validFrom)} ${new Date(account.validFrom).toLocaleDateString(locale)}`,
      //   `${t(k.requisites.validTo)} ${
      //     account.validTo
      //       ? new Date(account.validTo).toLocaleDateString(locale)
      //       : t(k.requisites.validInternal)
      //   }`,
      ];
    await copyData(text, setCopied);
    notify.success(t(k.requisites.requisitesCopied));
  };

  return (
    <div
      onClick={copyRequisites}
      title={t(k.requisites.copyRequisites)}
      className="relative border rounded-lg p-4 cursor-pointer transition-all hover:bg-gray-50 hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="font-semibold">
              {account.bankName}
            </div>

            {copied ? (
              <div className="flex items-center gap-1 text-green-600 text-xs">
                <Check size={14} />
                {t(k.requisites.requisitesCopied)}
              </div>
            ) : (
              <div
                className="flex items-center gap-1 text-gray-400 text-xs"
                title={t(k.requisites.copyRequisites)}
              >
                <Copy size={14} />
                {t(k.requisites.copyRequisites)}
              </div>
            )}
          </div>

          <div className="mt-2 font-mono text-sm break-all" title={account.iban}>
            {account.iban}
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-500">
            <span>
              {t(k.requisites.validFrom)} {new Date(account.validFrom).toLocaleDateString()}
            </span>

            <span>
              {t(k.requisites.validTo)} {
                account.validTo
                  ? new Date(account.validTo).toLocaleDateString()
                  : t(k.requisites.validInternal)
              }
            </span>
          </div>
        </div>

        <div
          className="flex gap-2 shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <IconAction
            icon={buttonActionTypes.edit}
            onClick={() => onEdit?.(account)}
            title={t(k.common.edit)}
          />

          {account.isActive ? (
            <IconAction
              icon={buttonActionTypes.deactivate}
              onClick={() => onDeactivate?.(account)}
              title={t(k.common.deactivate)}
            />
          ) : (
            <IconAction
              icon={buttonActionTypes.activate}
              onClick={() => onActivate?.(account)}
              title={t(k.common.activate)}
            />
          )}
        </div>
      </div>

      {copied && (<div className="absolute inset-0 rounded-lg bg-black/5 pointer-events-none animate-pulse"/>)}
    </div>
  );
}