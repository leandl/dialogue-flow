type DialogueNodeFlowHeaderProps = {
  dialogueType: string;
  characterName?: string;
};

export function DialogueNodeFlowHeader({
  dialogueType,
  characterName,
}: DialogueNodeFlowHeaderProps) {
  return (
    <div className="dialogue-node-flow-header">
      <span className="dialogue-node-flow-type">{dialogueType}</span>
      {characterName && (
        <span className="dialogue-node-flow-character-name">
          {characterName}
        </span>
      )}
    </div>
  );
}
