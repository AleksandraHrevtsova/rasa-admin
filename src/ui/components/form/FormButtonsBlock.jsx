import { buttonActionTypes } from "@/config/constants";
import { useI18n } from '@/ui/hooks/useI18n';
import { Button } from '@/ui/components/Button';

export const Buttons = (props) => {
  const { isEdit, isChanged, isSubmitDisabled, onBack, onSubmit, onSubmitAndBack, onActivate, onDeactivate } = props;
  const { t, k } = useI18n();
  return (
    <>
     <Button
        type='submit'
        label={isEdit ? t(k.common.save) : t(k.common.create)}
        action={buttonActionTypes.submit}
        onClick={onSubmit}
        disabled={isSubmitDisabled}
      />
      <Button
        type='submit'
        label={isEdit ? t(k.common.saveAndBack) : t(k.common.createAndBack)}
        action={buttonActionTypes.submit}
        onClick={onSubmitAndBack}
        disabled={isSubmitDisabled}
      />

      <Button
        label={isChanged ? t(k.common.cancel) : t(k.common.back)}
        action={buttonActionTypes.show}
        onClick={onBack}
      />

      {onDeactivate && (
        <Button
          label={t(k.common.deactivate)}
          action={buttonActionTypes.deactivate}
          onClick={onDeactivate}
        />
      )}

      {onActivate && (
        <Button
          label={t(k.common.activate)}
          action={buttonActionTypes.activate}
          onClick={onActivate}
        />
      )}
    </>
  )
};