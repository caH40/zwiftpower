import { useSelector } from 'react-redux';

import ButtonForFilter from '../ButtonForFilter/ButtonForFilter';
import { setRaceResultsPage } from '../../../../redux/features/filterRaceResultsPageSlice';
import { raceResultsBtn } from '../../../../assets/navigate-buttons';
import { getButtonPositionClassName } from '../../../../utils/buttonClasses';

/**
 * Выбор отображения страницы с результатами Эвента: финишировавших или сошедших райдеров
 */
function FilterPageRaceResults() {
  const intervalState = useSelector((state) => state.filterRaceResultsPage.value);

  return (
    <nav>
      {raceResultsBtn.map((pageNested, index) => {
        return (
          <ButtonForFilter
            key={pageNested.id}
            positionClassName={getButtonPositionClassName({
              index,
              quantityBtn: raceResultsBtn.length,
            })}
            active={intervalState.name === pageNested.name}
            reducer={setRaceResultsPage}
          >
            {pageNested.name}
          </ButtonForFilter>
        );
      })}
    </nav>
  );
}

export default FilterPageRaceResults;
