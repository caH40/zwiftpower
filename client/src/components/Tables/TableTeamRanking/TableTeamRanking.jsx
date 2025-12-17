import classnames from 'classnames/bind';

import TeamRow from '../../TeamRow/TeamRow';
import RatingPointsBox from '../../RatingPointsBox/RatingPointsBox';
import IconAdd from '../../icons/IconAdd';

import styles from '../Table.module.css';

import Thead from './Thead';

const cx = classnames.bind(styles);

export default function TableTeamRanking({
  getParticipantRatingResults,
  seasonLabel,
  teams = [],
}) {
  return (
    <table className={styles.table}>
      <caption className={styles.hidden}>Рейтинг команд</caption>
      <Thead />
      <tbody>
        {teams.map(
          ({
            _id,
            urlSlug,
            shortName,
            logoUrls,
            posterUrls,
            name,
            rank,
            rankPoints,
            totalMembers,
            averageRacingScore,
            totalResults,
            eventMedals,
          }) => (
            <tr className={cx('hover')} key={_id}>
              <td className={styles.rank}>{rank}</td>
              <td className={styles.rankPoints}>
                <RatingPointsBox points={rankPoints} />
              </td>
              <td className={styles.members}>{totalMembers}</td>
              <td>
                <TeamRow
                  urlSlug={urlSlug}
                  name={name}
                  shortName={shortName}
                  logoUrls={logoUrls}
                />
              </td>
              <td>
                <IconAdd
                  getClick={() =>
                    getParticipantRatingResults({
                      seasonLabel,
                      teamUrlSlug: urlSlug,
                    })
                  }
                  squareSize={18}
                  tooltip="Показать результаты"
                />
              </td>
              {/* <td>{eventMedals.gold}</td>
              <td>{eventMedals.silver}</td>
              <td>{eventMedals.bronze}</td>
              <td>{totalResults}</td> */}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
