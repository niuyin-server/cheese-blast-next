import ProfileWorks from './ProfileWorks';

type ProfileListSectionProps = {
  items: string[];
  emptyText?: string;
};

const ProfileListSection = ({ items, emptyText }: ProfileListSectionProps) => {
  return <ProfileWorks items={items} emptyText={emptyText} />;
};

export default ProfileListSection;

