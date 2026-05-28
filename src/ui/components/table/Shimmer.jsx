import { styleTokens } from '@/ui/tokens/form.tokens';

export const Shimmer = () => {
  return (
    <div className={styleTokens.shimmer.wrapper}>
      <div className={styleTokens.shimmer.block}>
        <div className={styleTokens.shimmer.content} />
      </div>
    </div>
  );
};