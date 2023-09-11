import IconSteering from '../../icons/IconSteering';

function TdDifferent({ isPairedSteeringDevice }) {
  return <td>{isPairedSteeringDevice ? <IconSteering squareSize={22} /> : null}</td>;
}

export default TdDifferent;
