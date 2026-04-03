import { FLOW_NODE_KINDS, FLOW_NODE_REGISTRY } from '../config/flowNodeRegistry';
import { PaletteCard } from 'entities/scenario/ui/PaletteCard.tsx';

export function ScenarioFlowPalette() {
  return (
    <aside className="flex w-48 shrink-0 flex-col gap-3">
      <p className="text-xs leading-snug text-slate-600">
        Перетащите блок на холст. Удаление - клавиши{' '}
        <kbd className="rounded bg-slate-200 px-1">Del</kbd> /{' '}
        <kbd className="rounded bg-slate-200 px-1">Backspace</kbd>.
      </p>
      {FLOW_NODE_KINDS.map((kind) => (
        <PaletteCard key={kind} kind={kind} {...FLOW_NODE_REGISTRY[kind].palette} />
      ))}
    </aside>
  );
}
