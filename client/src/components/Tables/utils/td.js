import avatar from '../../../images/avatar.svg';
import cls from '../Table.module.css';

export function tdRider(name, imageSrc) {
	const riderLogo = imageSrc ? imageSrc : avatar;
	return (
		<div className={cls.rider}>
			<img className={cls.logo} src={riderLogo} alt="Ph" /> <span>{name}</span>
		</div>
	);
}

export function tdLinkZP(zwiftRiderId) {
	return (
		<a
			target="_blank"
			rel="noreferrer"
			href={`https://zwiftpower.com/profile.php?z=${zwiftRiderId}`}
		>
			ZwiftPower
		</a>
	);
}

export function tdCategory(result) {
	let newCategory = result.category;
	if (result.category.includes('WA') || result.category.includes('WB'))
		newCategory = result.category.slice(1);
	return (
		<div className={cls.categoryBox}>
			<div className={`${cls.category} ${cls[result.category]}`}>{newCategory}</div>
			{result.isUnderChecking ? <div className={cls.underChecking}>❗</div> : ''}
		</div>
	);
}
