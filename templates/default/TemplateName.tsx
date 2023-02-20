import styles from "./TemplateName.module.scss";

interface ITemplateNameProps { }

export const TemplateName = ({ }: ITemplateNameProps) => {
	return (
		<div className={styles.templateName}>
			TemplateName Component
		</div>
	)
};
