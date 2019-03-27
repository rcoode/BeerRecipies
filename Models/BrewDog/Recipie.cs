using System;

namespace YesSql.Models.BrewDog
{
    public partial class Recipie
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Tagline { get; set; }
        public string FirstBrewed { get; set; }
        public string Description { get; set; }
        public Uri ImageUrl { get; set; }
        public double? Abv { get; set; }
        public long? Ibu { get; set; }
        public long? TargetFg { get; set; }
        public long? TargetOg { get; set; }
        public long? Ebc { get; set; }
        public long? Srm { get; set; }
        public double? Ph { get; set; }
        public long? AttenuationLevel { get; set; }
        public BoilVolume Volume { get; set; }
        public BoilVolume BoilVolume { get; set; }
        public Method Method { get; set; }
        public Ingredients Ingredients { get; set; }
        public string[] FoodPairing { get; set; }
        public string BrewersTips { get; set; }
        public string ContributedBy { get; set; }
    }

    public partial class BoilVolume
    {
        public double? Value { get; set; }
        public string Unit { get; set; }
    }

    public partial class Ingredients
    {
        public Malt[] Malt { get; set; }
        public Hop[] Hops { get; set; }
        public string Yeast { get; set; }
    }

    public partial class Hop
    {
        public string Name { get; set; }
        public BoilVolume Amount { get; set; }
        public string Add { get; set; }
        public string Attribute { get; set; }
    }

    public partial class Malt
    {
        public string Name { get; set; }
        public BoilVolume Amount { get; set; }
    }

    public partial class Method
    {
        public MashTemp[] MashTemp { get; set; }
        public Fermentation Fermentation { get; set; }
        public object Twist { get; set; }
    }

    public partial class Fermentation
    {
        public BoilVolume Temp { get; set; }
    }

    public partial class MashTemp
    {
        public BoilVolume Temp { get; set; }
        public long Duration { get; set; }
    }

}
