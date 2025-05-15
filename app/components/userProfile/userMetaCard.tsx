import { User } from "lucide-react";

export default function UserMetaCard({ username }: { username?: string }) {
  return (
    <>
      <div className="p-5 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
            <div className="w-20 h-20 overflow-hidden border border-primary-foreground rounded-full">
              {/* <img src="/images/user/owner.jpg" alt="user" /> */}
              <User className="size-20"></User>
            </div>
            <div className="order-3 xl:order-2">
              <h4 className="mb-2 text-lg font-semibold text-foreground xl:text-left">
                {`${username}`}
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
