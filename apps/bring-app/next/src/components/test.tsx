const colors = [
	"background",
	"foreground",
	"card",
	"card-foreground",
	"popover",
	"popover-foreground",
	"primary",
	"primary-foreground",
	"secondary",
	"secondary-foreground",
	"muted",
	"muted-foreground",
	"accent",
	"accent-foreground",
	"destructive",
	"destructive-foreground",
	"border",
	"input",
	"ring",
];

const Test = () => (
	<div>
		Test
		<div className="flex gap-4 flex-wrap">
			{colors.map((color) => (
				<div
					className={`bg-${color} border w-[100px] h-[100px] flex justify-center items-center`}
					key={color}
				>
					{color}
				</div>
			))}
		</div>
	</div>
);

export default Test;
